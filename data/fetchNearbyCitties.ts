export async function findNearbyCities(city: string) {
    const query = `
        <osm-script output="json" output-config="" timeout="25">
    <query into="center" type="node">
        <has-kv k="place" modv="" v="city"/>
        <has-kv k="name" modv="" v="${city}"/>
    </query>
    <query into="_" type="node">
        <has-kv k="place" modv="" v="city"/>
        <around from="center" radius="50000"/>
    </query>
    <print e="" from="_" geometry="skeleton" ids="yes" limit="" mode="body" n="" order="id" s="" w=""/>
    </osm-script>
    `
    const data = await fetch(`https://overpass-api.de/api/interpreter`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: query,
        cache: 'default'
    })
    const json = await data.json()
    const cities = json.elements.flatMap((c) => {
        if (c.tags.name !== city) {
            return c.tags.name
        }
        return []
    })
    return new Set(cities)
}
