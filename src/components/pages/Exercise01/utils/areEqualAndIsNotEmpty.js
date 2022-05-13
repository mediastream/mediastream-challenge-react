const areEqualAndIsNotEmpty = (arr1, arr2) => {
    const n = [...arr1].length
    const m = [...arr2].length

    if (n !== m || n === 0) return false

    arr1.sort()
    arr2.sort()

    return arr1.filter((e, i) => {
        if (e !== arr2[i]) return true
        return false
    }).length === 0
}

export default areEqualAndIsNotEmpty
