import PLP from './PLP';
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
export default function Category() {
  const { slug } = useParams();
  const cat = CATEGORIES.find(c => c.slug === slug);
  return <PLP title={cat ? cat.name : slug} />;
}
