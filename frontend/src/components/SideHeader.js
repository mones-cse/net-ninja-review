import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Category from "../pages/Category";

const Catagories = gql`
  query GetCategories {
    categories {
      name
      id
    }
  }
`;

export default function SideHeader() {
  const { loading, error, data } = useQuery(Catagories);

  if (loading) {
    return <p>Loading Category...</p>;
  }
  if (error) {
    return <p>Error while Loading Category...</p>;
  }

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Ninja review</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by categories </span>
        {data.categories.map(category => {
          return (
            <Link key={category.id} to={`/category/${category.id}`}>
              {category.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
