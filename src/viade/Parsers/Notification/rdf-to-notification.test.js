import { NotificationViade } from "../../Model";
import { RDFToNotification } from ".";
describe.only("Parser from RDF to notification", () => {
  const output = new NotificationViade(
    "Route share",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "https://christianpelaez98.solid.community/profile/card#me",
    "https://christianpelaez98.solid.community/ejemplos/ruta1.ttl",
    "2020-03-26T00:57:21.984Z",
    "undefined",
    "https://viadees4c.solid.community/profile/card#me",
    true,
    "https://testses4c.solid.community/public/notification.ttl"
  );

  const url = "https://testses4c.solid.community/public/notification.ttl";

  test("notification RDF 1", () => {
    RDFToNotification.parse(url).then((r) => expect(r).toEqual(output));
  });
});
