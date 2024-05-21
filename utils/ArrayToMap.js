export default function ArrayToMap(array, keyPropertyName) {
  const outerMap = new Map()

  array.forEach((item) => {
    // 객체를 Map으로 변환
    const innerMap = new Map(Object.entries(item))
    // keyPropertyName에 해당하는 속성을 키로 사용하여 외부 Map에 추가
    const key = item[keyPropertyName]
    if (key != null) {
      // key가 정의되어 있고 null이 아닌 경우에만 추가
      outerMap.set(key, innerMap)
    }
  })

  return outerMap
}

export const handleMapChange = (id, propertyKey, value, mapOfMaps) => {
  const itemMap = mapOfMaps.get(id)
  console.log(mapOfMaps)

  if (itemMap) {
    console.log(itemMap.set(propertyKey, value))
    itemMap.set(propertyKey, value)
    mapOfMaps.set(id, itemMap)
    return new Map(mapOfMaps) // 상태 업데이트 함수를 파라미터로 받음
  }
}

export function mapOfMapsToArray(mapOfMaps) {
  const array = []
  if (!(mapOfMaps instanceof Map)) {
    console.log("mapOfMaps is undefined or not an instance of Map.")
    return []
  }

  // 외부 Map을 순회
  mapOfMaps.forEach((value, key) => {
    // 내부 Map을 객체로 변환
    const object = Array.from(value).reduce((obj, [propKey, propValue]) => {
      obj[propKey] = propValue
      return obj
    }, {})

    // 변환된 객체에 id 속성 추가 (필요한 경우)
    object.id = key

    array.push(object)
  })

  return array
}
