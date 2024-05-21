import { flatten, map, groupBy } from "lodash-es"
// export const sortGamesByLeague = (gameList) => {
//   // 1단계: 게임 목록을 리그별로 그룹화
//   const groupedByLeague = groupBy(gameList, "leagueName");

//   // 2단계: 각 그룹에 대한 커스텀 객체 생성
//   const leagueObjects = map(groupedByLeague, (games, leagueName) => {
//     // 필터링된 게임 목록: markets 배열 내에서 특정 조건을 만족하는 게임만 포함
//     const filteredGames = games.filter((game) =>
//       game.markets.some((market) =>
//         ["1|2", "12", "12X", "1|2|X"].some((str) =>
//           market.marketName.includes(str),
//         ),
//       ),
//     );

//     return {
//       leagueName,
//       games: filteredGames, // 필터링된 게임 목록 사용
//       sportName: games[0]?.sportName, // sportName은 games 배열의 첫 번째 요소에서 가져옴
//       // 추가 정보
//     };
//   });

//   return leagueObjects;
// };

export const sortGamesByTimeAndLeague = (gameList) => {
  // 1단계: 게임 목록을 년-월-일-시간-10분 간격으로 그룹화
  const groupedByDateTime = groupBy(gameList, (game) => {
    const date = new Date(game.fixtureStartDate) // UTC 시간대를 사용
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1 // 월은 0부터 시작하므로 1을 더해줌
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = Math.floor(date.getUTCMinutes() / 10) * 10 // 10분 간격으로 내림
    return `${year}-${month}-${day}-${hour}:${minute}` // "년-월-일-시간-10분 간격" 형태의 문자열을 그룹화 기준으로 사용
  })

  // 2단계: 각 시간-날짜-10분 간격 그룹에 대해 리그별로 그룹화하고 최종 객체 생성
  let timeSortedLeagues = []
  map(groupedByDateTime, (gamesInDateTimeSlot) => {
    // 리그별로 그룹화
    const groupedByLeague = groupBy(gamesInDateTimeSlot, "leagueName")

    // 각 리그 그룹에 대한 커스텀 객체 생성
    const leagueObjects = map(groupedByLeague, (games, leagueName) => {
      return {
        leagueName,
        games,
        sportName: games[0]?.sportName, // 가정: 모든 게임은 같은 스포츠에 속함
        locationName: games[0]?.locationName,
      }
    })

    // 생성된 모든 리그 객체를 하나의 배열로 평탄화
    timeSortedLeagues = timeSortedLeagues.concat(leagueObjects)
  })

  // 최종 결과 반환
  return timeSortedLeagues
}

export const sortGamesByLeague = (gameList) => {
  // 1단계: 게임 목록을 리그별로 그룹화
  const groupedByLeague = groupBy(gameList, "leagueName")
  // 2단계: 각 그룹에 대한 커스텀 객체 생성
  const leagueObjects = map(groupedByLeague, (games, leagueName) => {
    return {
      leagueName,
      games, // 필터링된 게임 목록과 인덱스 사용
      sportName: games[0]?.sportName, // sportName은 games 배열의 첫 번째 요소에서 가져옴
      locationName: games[0]?.locationName,
      // 추가 정보
    }
  })

  return leagueObjects
}

//  새로운 3단계 league 내부 games 정렬
export const sortGamesWithinLeague = (league) => {
  // league.games가 배열이고 요소가 있는지 확인합니다.
  if (!Array.isArray(league.games) || league.games.length === 0) {
    return league // games 배열이 없거나 비어있으면, 원본 league 객체를 그대로 반환합니다.
  }

  // league 내의 games를 fixtureStartDate에 따라 오름차순으로 정렬합니다.
  league.games.sort((a, b) => {
    const dateA = new Date(a.fixtureStartDate)
    const dateB = new Date(b.fixtureStartDate)
    return dateA - dateB // 오름차순 정렬
  })
  return league // 정렬된 league 객체를 반환합니다.
}

export const sortGamesWithinLeague2 = (league) => {
  // league.games가 배열이고 요소가 있는지 확인합니다.
  if (!Array.isArray(league.games) || league.games.length === 0) {
    return league // games 배열이 없거나 비어있으면, 원본 league 객체를 그대로 반환합니다.
  }

  // league 내의 games를 fixtureStartDate에 따라 오름차순으로 정렬합니다.
  league.games.sort((a, b) => {
    const dateA = new Date(a.startDateTime)
    const dateB = new Date(b.startDateTime)
    return dateA - dateB // 오름차순 정렬
  })

  return league // 정렬된 league 객체를 반환합니다.
}

function parseAndCorrectDate(fixtureStartDate) {
  let [datePart, timePart] = fixtureStartDate.split("T")
  let [hours, minutes] = timePart.split(":").map(Number)

  if (hours >= 24) {
    hours -= 24
    const date = new Date(Date.UTC(...datePart.split("-").map(Number), hours, minutes))
    date.setUTCDate(date.getUTCDate() + 1)
    datePart = date.toISOString().split("T")[0]
  } else {
    // ISO string을 바로 Date 객체로 변환하여 UTC 기준으로 처리합니다.
    // 이는 입력된 시간대를 무시하고, UTC로 해석됩니다.
    const date = new Date(`${datePart}T${hours}:${minutes}:00.000Z`)
    return date
  }

  const correctedDate = new Date(`${datePart}T${hours}:${minutes}:00.000Z`)
  return correctedDate
}
// export const sortGamesWithinLeague = (league) => {
//   console.log("리그 내부 정렬");
//   if (!Array.isArray(league.games) || league.games.length === 0) {
//     return league;
//   }

//   league.games.sort((a, b) => {
//     const dateA = parseAndCorrectDate(a.fixtureStartDate);
//     const dateB = parseAndCorrectDate(b.fixtureStartDate);
//     return dateA - dateB; // 오름차순 정렬
//   });

//   return league; // 정렬된 league 객체를 반환합니다.
// };

// 4단계 시간별 정렬
export const sortGamesByDate = (leagueObjects) => {
  return leagueObjects.sort((a, b) => {
    // 배열이 존재하고, 첫 번째 요소가 있는지 확인
    const isValidAData = Array.isArray(a.data) && a.data.length > 0
    const isValidBData = Array.isArray(b.data) && b.data.length > 0
    const isValidAGames = Array.isArray(a.games) && a.games.length > 0
    const isValidBGames = Array.isArray(b.games) && b.games.length > 0

    // a.data[0] 또는 a.games[0]에서 날짜 추출
    let dateA = isValidAData
      ? new Date(a.data[0]?.fixtureStartDate)
      : isValidAGames
      ? new Date(a.games[0]?.fixtureStartDate)
      : null
    let dateB = isValidBData
      ? new Date(b.data[0]?.fixtureStartDate)
      : isValidBGames
      ? new Date(b.games[0]?.fixtureStartDate)
      : null

    // 날짜 비교
    if (dateA && dateB) {
      return dateA - dateB
    }
    console.log(leagueObjects)
    console.log(dateA - dateB)
    // 하나라도 유효하지 않은 경우
    return 0
  })
}
export const sortGamesByDate4 = (leagueObjects) => {
  console.log("sortGamesByDate4")
  return leagueObjects.sort((a, b) => {
    // 배열이 존재하고, 첫 번째 요소가 있는지 확인
    const isValidAData = Array.isArray(a.data) && a.data.length > 0
    const isValidBData = Array.isArray(b.data) && b.data.length > 0
    const isValidAGames = Array.isArray(a.games) && a.games.length > 0
    const isValidBGames = Array.isArray(b.games) && b.games.length > 0

    // a.data[0] 또는 a.games[0]에서 날짜 추출
    let dateA = isValidAData
      ? new Date(a.data[0]?.startDateTime)
      : isValidAGames
      ? new Date(a.games[0]?.startDateTime)
      : null
    let dateB = isValidBData
      ? new Date(b.data[0]?.startDateTime)
      : isValidBGames
      ? new Date(b.games[0]?.startDateTime)
      : null

    // 날짜 비교
    if (dateA && dateB) {
      return dateA - dateB
    }
    console.log(leagueObjects)
    console.log(dateA - dateB)
    // 하나라도 유효하지 않은 경우
    return 0
  })
}
export const NewsortGamesByDate = (leagueObjects) => {
  // 먼저 각 리그 객체의 게임들을 날짜 순으로 정렬합니다.
  leagueObjects.forEach((league) => {
    if (Array.isArray(league.games)) {
      league.games.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
    }
  })

  // 다음으로, 정렬된 리그 객체들을 그들의 가장 빠른 게임의 날짜에 따라 정렬합니다.
  return leagueObjects.sort((a, b) => {
    if (Array.isArray(a.games) && a.games.length > 0 && Array.isArray(b.games) && b.games.length > 0) {
      const dateA = new Date(a.games[0].startDateTime)
      const dateB = new Date(b.games[0].startDateTime)
      return dateA - dateB // 오름차순 정렬
    }
    return 0 // 하나라도 게임이 없으면 순서를 유지합니다.
  })
}

export const sortGamesByStartAt = (leagueObjects) => {
  return leagueObjects.sort((a, b) => {
    // 첫 번째 게임의 StartDateTime을 a.data[0] 또는 a.games[0]에서 사용하여 비교
    const startDateA =
      a.data && a.data.length > 0
        ? a.data[0].fixtureStartDate
        : a.games && a.games.length > 0
        ? a.games[0].fixtureStartDate
        : null
    const startDateB =
      b.data && b.data.length > 0
        ? b.data[0].fixtureStartDate
        : b.games && b.games.length > 0
        ? b.games[0].fixtureStartDate
        : null

    const dateA = startDateA ? new Date(startDateA) : new Date(0) // null이면 epoch
    const dateB = startDateB ? new Date(startDateB) : new Date(0) // null이면 epoch

    return dateA - dateB // 오름차순 정렬
  })
}

export const sortGamesByStartAt2 = (leagueObjects) => {
  return leagueObjects.sort((a, b) => {
    // 첫 번째 게임의 StartDateTime을 사용하여 비교
    const dateA = a.data[0] ? new Date(a.data[0].startDateTime) : new Date(0)
    const dateB = b.data[0] ? new Date(b.data[0].startDateTime) : new Date(0)
    return dateA - dateB // 오름차순 정렬
  })
}
// 최초정렬
export const sortGamesByLeague2 = (gameList) => {
  // 1단계: 게임 목록을 리그별로 그룹화
  const groupedByLeague = groupBy(gameList, "league")
  console.log(groupedByLeague)
  // 2단계: 각 그룹에 대한 커스텀 객체 생성
  const leagueObjects = map(groupedByLeague, (games, league) => {
    // winRate가 null이 아닌 게임만 필터링
    const filteredGames = games.filter((game) => game.winRate !== null)
    return {
      league,
      games: filteredGames, // 필터링된 게임 목록
      sport: filteredGames[0]?.sportName || filteredGames[0]?.sport, // sport는 필터링된 games 배열의 첫 번째 요소에서 가져옴
      location: filteredGames[0]?.location,
      // 추가 정보
    }
  })

  // games 배열의 길이가 0인 리그 객체를 제외
  const validLeagueObjects = leagueObjects.filter((obj) => obj.games.length > 0)

  return validLeagueObjects
}

export const sortGamesByLeagueCount = (gameList) => {
  // Grouping by league
  const groupedByLeague = groupBy(gameList, "leagueName")

  // Creating an array of objects with league and count
  const leagueCounts = map(groupedByLeague, (games, leagueName) => {
    return {
      league: leagueName,
      count: games.length,
    }
  })

  return leagueCounts
  // leagueCounts now contains the array of objects in the form [{league:..., count:123}, ...]
}

export const sortGamesBySportsCount = (gameList) => {
  // Grouping games by sportName
  const groupedBySport = groupBy(gameList, "sportName")

  // Creating an array of objects with sport and count
  const sportCountObjects = map(groupedBySport, (games, sportName) => {
    return {
      sport: sportName,
      count: games.length,
    }
  })

  return sportCountObjects
  // Returns the array of objects in the form [{sport:..., count:...}, ...]
}

// 최초정렬
export const sortGamesByTimeAndLeague2 = (gameList) => {
  // 1단계: 게임 목록을 년-월-일-시간-10분 간격으로 그룹화
  const groupedByDateTime = groupBy(gameList, (game) => {
    const date = new Date(game.startDateTime) // UTC 시간대를 사용
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1 // 월은 0부터 시작하므로 1을 더해줌
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = Math.floor(date.getUTCMinutes() / 5) * 5
    return `${year}-${month}-${day}-${hour}:${minute}` // "년-월-일-시간-10분 간격" 형태의 문자열을 그룹화 기준으로 사용
  })

  // 2단계: 각 시간-날짜-10분 간격 그룹에 대해 리그별로 그룹화하고 최종 객체 생성
  let timeSortedLeagues = []
  map(groupedByDateTime, (gamesInDateTimeSlot) => {
    // 리그별로 그룹화
    const groupedByLeague = groupBy(gamesInDateTimeSlot, "league")

    // 각 리그 그룹에 대한 커스텀 객체 생성
    const leagueObjects = map(groupedByLeague, (games, league) => {
      // winRate가 null이 아닌 게임만 필터링
      const filteredGames = games.filter((game) => game.winRate !== null)

      return {
        league,
        games: filteredGames, // 필터링된 게임 목록
        sport: filteredGames[0]?.sportName || filteredGames[0]?.sport, // sport는 필터링된 games 배열의 첫 번째 요소에서 가져옴
        location: filteredGames[0]?.location,
      }
    })

    // games 배열의 길이가 0인 리그 객체를 제외하고 결과 배열에 추가
    timeSortedLeagues = timeSortedLeagues.concat(leagueObjects.filter((obj) => obj.games.length > 0))
  })

  // 최종 결과 반환
  return timeSortedLeagues
}

export const sortGamesByTimeAndLeague3 = (gameList) => {
  // 1단계: 게임 목록을 시간대별로 그룹화
  const groupedByTime = groupBy(gameList, (game) => {
    const date = new Date(game.startDateTime) // UTC 시간대를 사용
    return date.getUTCHours() // UTC 기준 시간을 그룹화 기준으로 사용
  })
  // 2단계: 각 시간대 그룹에 대해 리그별로 그룹화하고 최종 객체 생성
  let timeSortedLeagues = []
  map(groupedByTime, (gamesInTimeSlot) => {
    // 리그별로 그룹화
    const groupedByLeague = groupBy(gamesInTimeSlot, "league")

    // 각 리그 그룹에 대한 커스텀 객체 생성
    const leagueObjects = map(groupedByLeague, (games, league) => {
      // winRate가 null이 아닌 게임만 필터링
      const filteredGames = games.filter((game) => game.winRate !== null)

      return {
        league,
        games: filteredGames, // 필터링된 게임 목록
        sport: filteredGames[0]?.sportName || filteredGames[0]?.sport, // sport는 필터링된 games 배열의 첫 번째 요소에서 가져옴
        location: filteredGames[0]?.locationName,
      }
    })

    // games 배열의 길이가 0인 리그 객체를 제외하고 결과 배열에 추가
    timeSortedLeagues = timeSortedLeagues.concat(leagueObjects.filter((obj) => obj.games.length > 0))
  })

  // 최종 결과 반환
  return timeSortedLeagues
}
export function sortGamesByRecentDate(gameObjects) {
  gameObjects.forEach((obj) => {
    if (Array.isArray(obj.games)) {
      obj.games.sort((a, b) => {
        const dateA = new Date(a.startDateTime)
        const dateB = new Date(b.startDateTime)
        return dateA - dateB // 내림차순 정렬
      })
    }
  })
  return gameObjects // 정렬된 객체 반환
}

export const sortGamesByDate2 = (leagueObjects) => {
  return sortGamesByRecentDate(leagueObjects).sort((a, b) => {
    if (!Array.isArray(a.games) || !Array.isArray(b.games)) {
      return 0 // If either is not an array, don't swap them
    }

    // Ensure there are games to compare
    if (!a.games[0] || !b.games[0]) {
      return 0 // If either game list is empty, don't swap them
    }

    // Use correct property name "startDateTime"
    const dateA = new Date(a.games[0].startDateTime)
    const dateB = new Date(b.games[0].startDateTime)
    return dateA - dateB // 오름차순 정렬
  })
}
export const sortGamesByDate3 = (leagueObjects) => {
  return leagueObjects.sort((a, b) => {
    if (!Array.isArray(a.games) || !Array.isArray(b.games)) {
      return 0 // If either is not an array, don't swap them
    }

    // Ensure there are games to compare
    if (!a.games[0] || !b.games[0]) {
      return 0 // If either game list is empty, don't swap them
    }

    // Use correct property name "startDateTime"
    const dateA = new Date(a.games[0].startDateTime)
    const dateB = new Date(b.games[0].startDateTime)
    return dateA - dateB // 오름차순 정렬
  })
}

export function sortingByMode(searchMode, list) {
  let LeagueSortedData
  // 데이터 처리 로직 (정렬, 필터링 등)
  if (searchMode === "league") {
    const leagueResult = sortGamesByLeague(list)
    LeagueSortedData = sortGamesByDate(leagueResult.map((leagues) => sortGamesWithinLeague(leagues)))
  } else if (searchMode === "time") {
    const timeResult = sortGamesByTimeAndLeague(list)
    LeagueSortedData = sortGamesByDate(timeResult.map((leagues) => sortGamesWithinLeague(leagues)))
  }
  return LeagueSortedData
}

export function sortingByMode2(searchMode, list) {
  let LeagueSortedData

  // 데이터 처리 로직 (정렬, 필터링 등)
  if (searchMode === "league") {
    const leagueResult = sortGamesByLeague2(list)
    LeagueSortedData = sortGamesByDate2(leagueResult.map((leagues) => sortGamesWithinLeague2(leagues)))
  } else if (searchMode === "time") {
    const timeResult = sortGamesByTimeAndLeague2(list)
    LeagueSortedData = sortGamesByDate2(timeResult.map((leagues) => sortGamesWithinLeague2(leagues)))
  }
  return LeagueSortedData
}
