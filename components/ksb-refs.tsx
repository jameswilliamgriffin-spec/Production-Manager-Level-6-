import { ksbs } from '@/lib/ksb-data';

const ksbById = new Map(ksbs.map((ksb) => [ksb.id, ksb]));

/** Compact code-only chips — used on the homepage overview, where the full KSB
 *  wording belongs on the projects page instead (see /projects). Built from
 *  `span`s rather than a `ul` so it stays valid nested inside the
 *  option-brief `<button>` cards, not just the core-module `<div>` cards. */
export function KsbChipRow({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <span className="duty-ksbs po-ksb-row" aria-label="KSBs covered">
      {ids.map((id) => (
        <span key={id} className={`duty-chip duty-chip-${id[0]}`}>
          {id}
        </span>
      ))}
    </span>
  );
}

/** Full KSB wording — used on the projects page, where each project's criteria
 *  should read out in full rather than as bare codes. */
export function KsbFullList({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <ul className="pjb-ksb-refs" aria-label="KSBs covered">
      {ids.map((id) => {
        const ksb = ksbById.get(id);
        if (!ksb) return null;
        return (
          <li key={id} className={`pjb-ksb-ref pjb-ksb-ref-${ksb.type}`}>
            <p className="pjb-ksb-ref-code">{id}</p>
            <p className="pjb-ksb-ref-text">{ksb.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
