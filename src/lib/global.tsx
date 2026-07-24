export type game = {
    name?: string,
    categories?: string[],
    description?: string,
    id?: string,
    exclusiveTags?: string[],
    sandboxFlags?: string[]
    folder?: string
}

export type gameInFolder = {
    name: string,
    categories?: string[],
    description?: string,
    exclusiveTags?: string[],
    sandboxFlags?: string[]
}