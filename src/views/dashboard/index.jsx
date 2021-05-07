import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardHeader } from 'reactstrap';
import { getCookie } from '~/services/auxi';
import CardPedido from './CardPedido';
import api from '~/services/api';

export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [cookies] = useState({
    MQTD: getCookie('LM_SALGADOS_MQTD'),
    ADAY: getCookie('LM_SALGADOS_ADAY'),
    DATA: getCookie('LM_SALGADOS_DATA'),
    EVRY: getCookie('LM_SALGADOS_EVRY'),
  });

  async function UpdateListing() {
    const { data } = await api.get(
      `/pedidos/?queue=1&mqtd=${cookies.MQTD}&aday=${cookies.ADAY}&data=${cookies.DATA}`
    );
    // console.clear();
    console.debug('UpdateListing =>', data);
    setQueue(data.data.queue);
  }

  useEffect(() => {
    UpdateListing();
  }, [cookies]);

  useEffect(() => {
    const MS = cookies.EVRY ? cookies.EVRY : 0.5;
    const interval = setInterval(() => {
      UpdateListing();
    }, MS * 60 * 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  let qtd50 = 0;
  let qtd100 = 0;
  let qtd200 = 0;

  return (
    <Row>
      {queue.map((item) => (
        <Col xl="1">
          <Card>
            <CardHeader className="text-center hi_bg-danger">
              {item.time}
            </CardHeader>

            <Table className="text-center hi_bg-muted">
              <tbody>
                {item.pedidos.map((pedido) => {
                  const grouped = groupBy(pedido.items, (item) => item.qtd);

                  qtd50 += grouped.get(50)?.length ? grouped.get(50).length : 0;
                  qtd100 += grouped.get(100)?.length
                    ? grouped.get(100).length
                    : 0;
                  qtd200 += grouped.get(200)?.length
                    ? grouped.get(200).length
                    : 0;
                })}
                <tr>
                  <td className="text-info">50</td>
                  <td className="text-black">{qtd50}</td>
                </tr>
                <tr>
                  <td className="text-info">100</td>
                  <td className="text-black">{qtd100}</td>
                </tr>
                <tr>
                  <td className="text-info">200</td>
                  <td className="text-black">{qtd200}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
