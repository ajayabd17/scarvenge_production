import PLP from './PLP';
import { useParams } from 'react-router-dom';
import { COLLECTIONS } from '../data/categories';
export default function Collections() {
  const { slug } = useParams();
  const col = COLLECTIONS.find(c => c.slug === slug);
  return <PLP title={col ? col.name : 'Collection'} />;
}
