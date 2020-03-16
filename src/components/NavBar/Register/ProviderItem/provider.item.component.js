import React from "react";

type Props = {
  data: any,
  onSelect: Function,
  radioName: String,
  id: String,
  checked: Boolean
};

const ProviderItem = ({ data, onSelect, radioName, id, checked }: Props) => (
  <div>
    <input
      type="radio"
      name={radioName}
      id={id}
      onChange={onSelect}
      value={data.registerLink}
      checked={checked}
    />
    <div className="img-group">
      <img src={data.image} alt={data.label} />
      <span className="label">{data.label}</span>
    </div>
  </div>
);

export default ProviderItem;
