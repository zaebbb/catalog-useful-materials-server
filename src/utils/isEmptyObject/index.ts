export const isEmptyObject = (object: object): boolean => {
  const filterObject = Object
    .fromEntries(Object
      .entries(object)
      .filter(
        ([_, value]) => Boolean(value)
      )
    )

  return Boolean(!Object.keys(filterObject).length)
}
