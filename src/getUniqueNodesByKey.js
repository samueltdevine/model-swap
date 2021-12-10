const getUniqeNodesByKey = (keyContainString, gltf) => {
  const checkIfGroup = (nodeOrGroup) =>
    nodeOrGroup.children &&
    Array.isArray(nodeOrGroup.children) &&
    nodeOrGroup.children.length > 0;
  const nodesAndGroupsEntries = Object.entries(gltf.nodes);
  return nodesAndGroupsEntries
    .filter(([key, nodeOrGroup]) => {
      if (!key.includes(keyContainString)) return true;

      if (checkIfGroup(nodeOrGroup)) return false;
      const isInAGroup = nodesAndGroupsEntries.some((entry) => {
        if (entry[0] === key) return false;
        const isEntryGroup = checkIfGroup(entry[1]);
        if (!isEntryGroup) return false;
        return entry[1].children.some(
          (child) => child.name === nodeOrGroup.name
        );
      });
      if (isInAGroup) return false;
      return true;
    })
    .map(([, value]) => value);
};

export default getUniqeNodesByKey;
