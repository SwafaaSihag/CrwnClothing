import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.components';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles.jsx'

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
     <h2>
     <Link className='title' to={title}>{title.toUpperCase()}</Link>
     </h2>
     <Preview>
     {
        products
        .filter((_, idx) => idx < 4)
        .map((product) => (
            <ProductCard key={product.id} product={product} />
        ))
     }
     </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;

//we add a span into the H2 in order to just make the clickable event on the span and not on the entire h2