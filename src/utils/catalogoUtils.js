export const catalogosUnicos = (vinos) => {
  const unicos = (idKey, nombreKey) => {
    const map = new Map();
    vinos.forEach((v) => {
      if (v[idKey] && !map.has(v[idKey]))
        map.set(v[idKey], { id: v[idKey], name: v[nombreKey] });
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  };
  return {
    colorId:       unicos("colorId",       "colorNombre"),
    cepaId:        unicos("cepaId",        "cepaNombre"),
    azucarId:      unicos("azucarId",      "azucarNombre"),
    crianzaId:     unicos("crianzaId",     "crianzaNombre"),
    elaboracionId: unicos("elaboracionId", "elaboracionNombre"),
    medidaId:      unicos("medidaId",      "medidaNombre"),
  };
};
