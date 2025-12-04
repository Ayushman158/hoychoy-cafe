const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin','*');res.header('Access-Control-Allow-Headers','Content-Type');res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');if(req.method==='OPTIONS')return res.sendStatus(204);next();});

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'MERCHANT_ID_HERE';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || 'SALT_KEY_HERE';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const ENV = (process.env.PHONEPE_ENV || 'SANDBOX').toUpperCase();
const BASE = ENV==='PROD' ? 'https://api.phonepe.com/apis/hermes' : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || '';
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || '';

let tokenCache = { token: '', expiresAt: 0 };

async function getAuthToken(){
  try{
    const now = Math.floor(Date.now()/1000);
    if(tokenCache.token && tokenCache.expiresAt - 60 > now) return tokenCache.token;
    const url = ENV==='PROD'
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_version: CLIENT_VERSION,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    }).toString();
    const res = await fetch(url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
    const data = await res.json();
    if(!res.ok || !data.access_token){
      throw new Error('oauth_failed');
    }
    tokenCache = { token: data.access_token, expiresAt: data.expires_at || (now+3600) };
    return tokenCache.token;
  }catch(e){
    return '';
  }
}

function xVerify(hashInput){
  const hash = crypto.createHash('sha256').update(hashInput).digest('hex');
  return `${hash}###${SALT_INDEX}`;
}

async function phonepePay(payload){
  const path = '/pg/v1/pay';
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString('base64');
  const headers = {
    'Content-Type':'application/json',
    'X-VERIFY': xVerify(base64 + path + SALT_KEY),
    'X-MERCHANT-ID': MERCHANT_ID
  };
  const auth = await getAuthToken();
  if(auth) headers['Authorization'] = `O-Bearer ${auth}`;
  const res = await fetch(`${BASE}${path}`,{method:'POST',headers,body:JSON.stringify({request:base64})});
  const data = await res.json();
  return {ok:res.ok, data};
}

async function phonepeStatus(merchantTransactionId){
  const path = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
  const headers = {
    'Content-Type':'application/json',
    'X-VERIFY': xVerify(path + SALT_KEY),
    'X-MERCHANT-ID': MERCHANT_ID
  };
  const auth = await getAuthToken();
  if(auth) headers['Authorization'] = `O-Bearer ${auth}`;
  const res = await fetch(`${BASE}${path}`,{method:'GET',headers});
  const data = await res.json();
  return {ok:res.ok, data};
}

const payments = new Map();

app.post('/api/initiate-payment', async (req,res)=>{
  try{
    const { amount, orderId, customerPhone, customerName, redirectUrl, callbackUrl } = req.body;
    if(!amount || !orderId) return res.status(400).json({error:'amount and orderId required'});
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: orderId,
      amount: Math.round(Number(amount)*100),
      merchantUserId: customerPhone || customerName || 'user',
      mobileNumber: customerPhone,
      redirectUrl,
      callbackUrl,
      paymentInstrument: { type: 'PAY_PAGE' }
    };
    const resp = await phonepePay(payload);
    if(!resp.ok) return res.status(500).json({error:'phonepe-init-failed', details:resp.data});
    const url = resp.data?.data?.instrumentResponse?.redirectInfo?.url;
    payments.set(orderId, {status:'PENDING', amount});
    return res.json({redirectUrl:url, orderId});
  }catch(e){
    return res.status(500).json({error:'server-error', message:String(e)});
  }
});

app.post('/api/payment-callback', (req,res)=>{
  try{
    const { merchantTransactionId, transactionId, state } = req.body || {};
    if(merchantTransactionId){
      payments.set(merchantTransactionId, {status:state, transactionId});
    }
    res.json({ok:true});
  }catch{
    res.status(500).json({error:'callback-error'});
  }
});

app.get('/api/payment-status/:id', async (req,res)=>{
  try{
    const id = req.params.id;
    const resp = await phonepeStatus(id);
    if(!resp.ok) return res.status(500).json({error:'phonepe-status-failed', details:resp.data});
    const code = resp.data?.code;
    const status = resp.data?.data?.state || 'PENDING';
    const transactionId = resp.data?.data?.transactionId || null;
    payments.set(id, {status, transactionId});
    res.json({status, transactionId, code});
  }catch(e){
    res.status(500).json({error:'server-error', message:String(e)});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`PhonePe server listening on http://localhost:${PORT}`);
});
