function flattenData(promises) {
  return promises.reduce((acc, item) => {
    const commonData = {
      betGroupId: item.betGroupId,
      bet: item.bet,
      totalRate: item.totalRate,
      expectedProfit: item.expectedProfit,
      realProfit: item.realProfit,
      betStartTime: item.betStartTime,
      orderResult: item.orderResult,
      betFoldTypeEnum: item.betFoldTypeEnum,
    }

    const listItems = item.list.map((listItem) => ({
      ...commonData,
      ...listItem,
    }))
    return acc.concat(listItems)
  }, [])
}

export default flattenData
