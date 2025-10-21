export function parseCsvRows(csv: string): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/)
  if (lines.length < 2)
    return []

  const headers = parseCsvLine(lines[0]!)

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)

    const obj: Record<string, string> = {}

    headers.forEach((header, i) => {
      if (values[i])
        obj[header] = values[i]
    })

    return obj
  })
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"'
        i++
      }
      else {
        inQuotes = !inQuotes
      }
    }
    else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    }
    else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}
