"use client";
import React from "react";

export type DomainFilters = {
  extensions: string[];
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  exact?: boolean;
  minLength?: number;
  maxLength?: number;
  sellerName?: string;
};

const extensions = [
  ".com", ".org", ".net", ".ai", ".io", ".co", ".xyz", ".us", ".uk"
];

type Props = {
  filters: DomainFilters;
  onChange: (filters: DomainFilters) => void;
};

const FilterDomain = ({ filters, onChange }: Props) => {
  const update = (patch: Partial<DomainFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="p-5 space-y-6 text-sm">
      <section>
        <h4 className="font-semibold mb-3">Extensions</h4>
        <div className="space-y-2">
          {extensions.map(ext => (
            <label key={ext} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.extensions.includes(ext)}
                onChange={() =>
                  update({
                    extensions: filters.extensions.includes(ext)
                      ? filters.extensions.filter(e => e !== ext)
                      : [...filters.extensions, ext]
                  })
                }
              />
              {ext}
            </label>
          ))}
        </div>
      </section>
      <section>
        <h4 className="font-semibold mb-3">Keywords</h4>
        <div className="space-y-2">
          <input
            placeholder="Starts with"
            className="w-full border rounded px-3 py-2"
            value={filters.startsWith || ""}
            onChange={e => update({ startsWith: e.target.value })}
          />
          <input
            placeholder="Ends with"
            className="w-full border rounded px-3 py-2"
            value={filters.endsWith || ""}
            onChange={e => update({ endsWith: e.target.value })}
          />
          <input
            placeholder="Contains"
            className="w-full border rounded px-3 py-2"
            value={filters.contains || ""}
            onChange={e => update({ contains: e.target.value })}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.exact || false}
              onChange={e => update({ exact: e.target.checked })}
            />
            Exact match
          </label>
        </div>
      </section>
      <section>
        <h4 className="font-semibold mb-3">Length</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            min={1}
            step={1}
            inputMode="numeric"
            className="w-1/2 border rounded px-3 py-2"
            value={filters.minLength ?? ""}
            onKeyDown={e => {
              if (['-', '+', '.', 'e', 'E'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={e => {
              const value = e.target.value;
              if (value === "") {
                update({ minLength: undefined });
                return;
              }
              const num = Number(value);
              if (Number.isInteger(num) && num >= 1) {
                update({ minLength: num });
              }
            }}
          />
          <input
            type="number"
            placeholder="Max"
            min={1}
            step={1}
            inputMode="numeric"
            className="w-1/2 border rounded px-3 py-2"
            value={filters.maxLength ?? ""}
            onKeyDown={e => {
              if (['-', '+', '.', 'e', 'E'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={e => {
              const value = e.target.value;
              if (value === "") {
                update({ maxLength: undefined });
                return;
              }
              const num = Number(value);
              if (Number.isInteger(num) && num >= 1) {
                update({ maxLength: num });
              }
            }}
          />
        </div>
      </section>
      <section>
        <h4 className="font-semibold mb-3">Seller</h4>
        <input
          placeholder="Seller name"
          className="w-full border rounded px-3 py-2"
          value={filters.sellerName || ""}
          onChange={e => update({ sellerName: e.target.value })}
        />
      </section>
      <button
        onClick={() => onChange({ extensions: [] })}
        className="text-blue-600 font-medium"
      >
        Clear all
      </button>

    </div>
  );
};

export default FilterDomain;
