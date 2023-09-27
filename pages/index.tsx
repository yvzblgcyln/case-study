import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { getRequestItems } from "@/actions/pokemonActions";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function Home() {
  const [filteredList, setFilteredList]: any = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [Lodaing, setLoading] = useState(false);
  const pagelimit: any = process.env.NEXT_PUBLIC_PAGE_LIMIT;

  useEffect(() => {
    setLoading(true);
    getData();
  }, [page]);

  const getData = async () => {
    const data: any = await getRequestItems(page - 1, pagelimit);
    setFilteredList(data.data.results);
    setTotalPage(data.data.count);
    setLoading(false);
  };

  return (
    <Container>
      <Row className="list">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <h2>Pokemon List</h2>
          <Row className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 300 }}>
            {Lodaing ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              filteredList.map((item: any, index: number) => (
                <Row>
                  <a className="list-title" href={`/details/${item.name}`} key={index}>
                    {item.name}
                  </a>
                </Row>
              ))
            )}
          </Row>
          <Row style={{ marginTop: 20 }}>
            <PaginationControl
              page={page}
              between={3}
              total={totalPage}
              limit={pagelimit}
              changePage={(page) => setPage(page)}
              ellipsis={1}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
