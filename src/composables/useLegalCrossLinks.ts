export const LEGAL_ROUTE_PRIVACY = '/privacy-policy'
export const LEGAL_ROUTE_TERMS = '/terms-and-conditions'

export type LegalPageType = 'privacy' | 'terms'

export type LegalInlinePiece =
  | { kind: 'text'; text: string }
  | { kind: 'route'; text: string; to: string }
  | { kind: 'mailto'; text: string; href: string }

const MAIL_ADDRESS = 'info@viviyan.co'

function splitByDelimiter(
  text: string,
  delimiter: string,
  mapMatch: (matched: string) => LegalInlinePiece
): LegalInlinePiece[] {
  if (!delimiter) {
    return [{ kind: 'text', text }]
  }
  const parts = text.split(delimiter)
  const out: LegalInlinePiece[] = []
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i]
    if (part !== '') {
      out.push({ kind: 'text', text: part })
    }
    if (i < parts.length - 1) {
      out.push(mapMatch(delimiter))
    }
  }
  return out
}

function flattenRouteSplit(
  pieces: LegalInlinePiece[],
  delimiter: string,
  to: string
): LegalInlinePiece[] {
  const next: LegalInlinePiece[] = []
  for (const piece of pieces) {
    if (piece.kind !== 'text') {
      next.push(piece)
      continue
    }
    const split = splitByDelimiter(piece.text, delimiter, () => ({
      kind: 'route',
      text: delimiter,
      to,
    }))
    next.push(...split)
  }
  return next
}

function applyMailto(pieces: LegalInlinePiece[]): LegalInlinePiece[] {
  const next: LegalInlinePiece[] = []
  for (const piece of pieces) {
    if (piece.kind !== 'text') {
      next.push(piece)
      continue
    }
    const split = splitByDelimiter(piece.text, MAIL_ADDRESS, () => ({
      kind: 'mailto',
      text: MAIL_ADDRESS,
      href: `mailto:${MAIL_ADDRESS}`,
    }))
    next.push(...split)
  }
  return next
}

/**
 * Разбивает строку юридического текста на фрагменты: перекрёстные ссылки и mailto.
 * На странице Privacy — ссылка только на Terms and Conditions (не на саму Privacy).
 * На странице Terms — ссылка только на Privacy Policy (не на Terms).
 */
export function buildLegalInlinePieces(text: string, page: LegalPageType): LegalInlinePiece[] {
  let pieces: LegalInlinePiece[] = [{ kind: 'text', text }]

  if (page === 'privacy') {
    pieces = flattenRouteSplit(pieces, 'Terms and Conditions', LEGAL_ROUTE_TERMS)
  } else {
    pieces = flattenRouteSplit(pieces, 'Privacy Policy', LEGAL_ROUTE_PRIVACY)
  }

  pieces = applyMailto(pieces)
  return pieces
}
