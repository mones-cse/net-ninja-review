import ReactMarkdown from "react-markdown";
import { useApolloClient, gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      reviews {
        title
        id
        rating
        body
        categories {
          name
          id
        }
      }
    }
  }
`;
export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }
  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map(review => {
        return (
          <div key={review.title} className={"review-card"}>
            <div className="rating">{review.rating}</div>
            <h2>{review.title}</h2>
            {review.categories.map(category => {
              return <small>{category.name}</small>;
            })}

            <ReactMarkdown>
              {review.body.substring(0, 190).concat("....")}
            </ReactMarkdown>
            <Link to={`/details/${review.id}`}>Read More</Link>
          </div>
        );
      })}
    </div>
  );
}
