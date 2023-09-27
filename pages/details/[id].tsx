import { getItem } from "@/actions/pokemonActions";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Details({ serieID }: any) {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState([]);
  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data: any = await getItem(serieID);
    setData(data.data);
  };

  return (
    <Container className="container ">
      <div className="detailst">
        <a href="/">&larr; </a>
        <Row className="d-flex flex-column justify-content-center align-items-center" style={{ textAlign: "center" }}>
          <div className="img-cont">
            <img src={data?.sprites?.front_default} alt="" />
          </div>
          <h2 style={{ textTransform: "uppercase" }}>{id}</h2>
        </Row>
        <Row>
          <Col>
            {data?.stats?.map((item: any) => (
              <div>
                <h6 style={{ display: "inline" }}>{item?.stat?.name}</h6>: {item?.base_stat}
              </div>
            ))}
            <h6 style={{ display: "inline" }}>weight: </h6>
            {data.weight}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Details;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const seri_id = params.id;

  return {
    props: { serieID: seri_id },
  };
}
