import useUserData from '@app/hooks/useUserData';
import useFirestoreForceUpdate from '@app/hooks/useFirestoreForceUpdate';

const useAppInitialize = () => {
  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const {loading, updates} = useFirestoreForceUpdate();
  useUserData();

  return {updates, loading};
};
export default useAppInitialize;
