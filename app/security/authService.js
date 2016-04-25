export default function($firebaseAuth, firebaseRefs) {
  return $firebaseAuth(firebaseRefs.root);
};
