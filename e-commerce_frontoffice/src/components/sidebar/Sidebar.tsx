import React, { useState } from "react";
import "./Sidebar.css";
import Checkbox from "../checkbox/Checkbox";

export default function Sidebar() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <aside>
      <h3>Affinez votre recherche</h3>
      <h4>Marque</h4>
      <ul>
        <Checkbox label="Adidas" value={false} onChange={handleChange} />
        <li>
          <Checkbox label="Nike" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Asics" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="New Balance" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox
            label="Under Armour"
            value={false}
            onChange={handleChange}
          />
        </li>
        <li>
          <Checkbox label="Adidas" value={false} onChange={handleChange} />
        </li>
      </ul>
      <h4>Prix</h4>
      <ul>
        <li>
          <Checkbox
            label="Moins de 100€"
            value={false}
            onChange={handleChange}
          />
        </li>
        <li>
          <Checkbox
            label="Entre 100€ et 200€"
            value={false}
            onChange={handleChange}
          />
        </li>
        <li>
          <Checkbox
            label="Entre 200€ et 300€"
            value={false}
            onChange={handleChange}
          />
        </li>
        <li>
          <Checkbox
            label="Plus de 300€"
            value={false}
            onChange={handleChange}
          />
        </li>
      </ul>
      <h4>Genre</h4>
      <ul>
        <li>
          <Checkbox label="Homme" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Femme" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Mixte" value={false} onChange={handleChange} />
        </li>
      </ul>
      <h4>Pointure</h4>
      <ul>
        <li>
          <Checkbox label="36" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="37" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="38" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="39" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="40" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="41" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="42" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="43" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="44" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="45" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="46" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="47" value={false} onChange={handleChange} />
        </li>
      </ul>
      <h4>Couleur</h4>
      <ul>
        <li>
          <Checkbox label="Noir" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Blanc" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Bleu" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Rouge" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Vert" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Jaune" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Rose" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Orange" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Violet" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Marron" value={false} onChange={handleChange} />
        </li>
        <li>
          <Checkbox label="Gris" value={false} onChange={handleChange} />
        </li>
      </ul>
    </aside>
  );
}
