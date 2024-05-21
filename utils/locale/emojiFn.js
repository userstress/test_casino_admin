const sportsEntities = {
  Football: "Football.png",
  "American Football": "AmericanFootball.png",
  Basketball: "BasketBallIcon.png",
  Snooker: "SnookerIcon.png",
  Darts: "DartsIcon.png",
  "Ice Hockey": "HokeyIcon.png",
  Handball: "HandballIcon.png",
  Tennis: "TennisIcon.png",
  "E-Games": "EsportsIcon.png",
  "Table Tennis": "TableTennisIcon.png",
  Volleyball: "VolleyballIcon.png",
  Baseball: "BaseballIcon.png",
};

export default function getHtmlEntity(sport) {
  return sportsEntities[sport] || "unknown.png";
}
