import { useCallback, useEffect } from "react";
import useMemoCompare from "./useMemoCompare";

const useStateQuery = ({
  initialState,
  key,
  serialization: { serializer, deserializer },
}) => {
  const getSerializedStateFromLocation = useCallback(
    (key) => new URLSearchParams(window.location.search).get(key),
    []
  );
  useEffect(() => {}, []);
  const comparison = useCallback((prev, next) => prev === next, []);
  const state = useMemoCompare(
    deserializer(getSerializedStateFromLocation(key)) || initialState,
    comparison
  );
  const setState = useCallback((newState) => {
    const serializedNewState = serializer(newState);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, serializedNewState);
    window.location.search = searchParams.toString();
  }, []);

  return [state, setState];
};

export default useStateQuery;
