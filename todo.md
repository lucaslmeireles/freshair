function loopOverComponents(components: { [key: string]: number }) {
const flatList = [];
console.log(components);
for (const [key, value] of Object.entries(components)) {
flatList.push(
<Text key={key}>
{key} : {value}{" "}
</Text>
);
}
return flatList;
}
