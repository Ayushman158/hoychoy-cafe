import data from "../data/menu.json";

const KEY = "hc_menu_overrides";

export function loadMenuOverrides(){
  try{ return JSON.parse(localStorage.getItem(KEY) || "{}"); }catch{ return {}; }
}

export function saveMenuOverrides(over){
  localStorage.setItem(KEY, JSON.stringify(over));
}

export function resetMenuOverrides(){
  localStorage.removeItem(KEY);
}

export function getMenu(){
  const over = loadMenuOverrides();
  const removed = Array.isArray(over.removed) ? new Set(over.removed) : new Set();
  const edited = over.edited && typeof over.edited === "object" ? over.edited : {};
  const added = Array.isArray(over.added) ? over.added : [];
  const availability = over.availability && typeof over.availability === "object" ? over.availability : {};

  let items = data.items
    .filter(it => !removed.has(it.id))
    .map(it => edited[it.id] ? { ...it, ...edited[it.id] } : it)
    .map(it => availability[it.id] != null ? { ...it, available: !!availability[it.id] } : it);

  items = items.concat(added);

  const addedCats = added.map(a => a.category).filter(Boolean);
  const categories = Array.from(new Set([...(data.categories||[]), ...addedCats]));

  return { categories, items };
}

export function makeIdFromName(name){
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 40);
}
