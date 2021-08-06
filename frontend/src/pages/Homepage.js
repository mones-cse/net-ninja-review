import { Link } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      id
      rating
      body
      categories {
        name
      }
    }
  }
`;

export default function Homepage() {
  // const { loading, error, data } = useFetch("http://localhost:1337/reviews");
  const { loading, error, data } = useQuery(REVIEWS);

  console.log({ data });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }
  return (
    <div>
      {data.reviews.map(review => {
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
