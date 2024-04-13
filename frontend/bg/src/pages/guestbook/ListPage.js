import { useSearchParams } from "react-router-dom";
const ListPage = () => {
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  return (
    <div>
      <div>
        List Page {page} --- {size}
      </div>
      ;
    </div>
  );
};

export default ListPage;