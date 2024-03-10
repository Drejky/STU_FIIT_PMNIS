export const BUS_STOPS_QUERY = `
[out:json];
area["name"="Trnava"]["boundary"="administrative"];
node["highway"="bus_stop"](area);
out body;
`;
