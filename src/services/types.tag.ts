// export const TagConstIds = Object.freeze({
//   transport: 5,
//   housing: 20, // nocleg
//   appartment: 35, // mieszkanie
// } as const)

// idiotic enum alternative
export class TagConstIds {
  static transport = 5
  static housing = 20
  static appartment = 35
}

export class LocationTagConstIds {
  static anywhere = 26
}

// Color.transport

// export type TagType = typeof TagConstIds[keyof typeof TagConstIds]
// export type MM = typeof TagConstIds[keyof typeof TagConstIds] // (A)
