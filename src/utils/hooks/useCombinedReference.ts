import React from 'react';

function setReference<T>(ref: React.Ref<T | null>, value: null) {
  if (typeof ref === 'function') ref(value);
  // eslint-disable-next-line no-param-reassign
  else if (ref) ref = { current: value };
}

const useCombinedReference = (
  ...refs: Array<React.Ref<HTMLInputElement | null>>
) => {
  if (!refs.every((ref) => ref == null)) return null;
  const forkReference = (refValue: null) => refs.forEach((ref) => setReference(ref, refValue));
  return React.useCallback(forkReference, [refs]);
};

export default useCombinedReference;
