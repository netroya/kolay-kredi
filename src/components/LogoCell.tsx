import { BANKS } from '../data/banks'

export function LogoCell({slug, alt}: {slug: string; alt?: string}) {
  const b = BANKS.find(x => x.slug === slug)!;
  return (
    <a href={b.homepage} rel="nofollow noopener" aria-label={b.name}>
      <img src={b.logo} width="240" height="88" alt={alt ?? `${b.name} logosu`}
        loading="lazy" decoding="async" className="max-w-full h-auto object-contain" />
    </a>
  )
}