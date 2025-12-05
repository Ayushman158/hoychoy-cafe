import React, { useState } from "react";
import { getMenu } from "../utils/menu.js";
import { BACKEND_URL } from "../config.js";

const BEST_SELLER_IDS = [
  "octopus",
  "chicken_meifoon",
  "grilled_teriyaki_chicken",
  "penne_arrabbiata_veg",
  "pesto_pasta_veg",
  "green_mafia",
  "red_velvet_chicken",
  "grilled_fish_lemon_butter",
  "thukpa_chicken"
];

const IMAGE_MAP = {
  octopus: "https://iili.io/fzFX0ge.jpg",
  chicken_meifoon: "https://iili.io/fzFVbFn.jpg",
  grilled_teriyaki_chicken: "https://iili.io/fzFhiwx.jpg",
  penne_arrabbiata_veg: "https://iili.io/fzFGgiF.jpg",
  pesto_pasta_veg: "https://iili.io/fzCIdQa.jpg",
  green_mafia: "https://iili.io/fzCulLu.jpg",
  red_velvet_chicken: "https://iili.io/fzCuypS.jpg",
  grilled_fish_lemon_butter: "https://iili.io/fzCR9cv.jpg",
  thukpa_chicken: "https://iili.io/fzCRDe2.jpg"
};

function img(id){
  try{
    const k = "hc_img_"+id;
    const v = localStorage.getItem(k);
    return v || IMAGE_MAP[id] || null;
  }catch(e){
    return IMAGE_MAP[id] || null;
  }
}

export default function Menu({cart, setCart, onProceed}){
  const [filters,setFilters]=useState([]);
  const [cat,setCat]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [justAdded,setJustAdded]=useState(null);
  const [query,setQuery]=useState("");
  const [appOpen,setAppOpen]=useState(true);
  const [appReason,setAppReason]=useState('OPEN');

  return (
    <div>
      <button
        className="btn w-full bg-red-500 text-white mt-2"
        disabled={Object.keys(cart).length === 0}
        onClick={() => setCart({})}
      >
        Clear Cart
      </button>
    </div>
  );
}
