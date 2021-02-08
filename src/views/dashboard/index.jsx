import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Row,
  Col,
  Card,
  CardHeader
} from 'reactstrap';
import CardPedido from './CardPedido';
import { ActionBox } from '~/components/Styled';
import ConfigModal from './ConfigModal';

import api from '~/services/api';

export default function Dashboard() {
  const [lista, setLista] = useState([]);
  const [filter, setFilter] = useState({
    dia: format(new Date(), 'yyyy-MM-dd'),
    all_day: true,
    mim_qtd: 50,
  });

  async function UpdateListing() {
    const { data } = await api.get('/pedidos', {
      dia: filter.dia,
      all_day: filter.all_day,
      mim_qtd: filter.mim_qtd,
    });

    setLista(data.data.lista);
    console.debug("Lista Atualizada!", data.data.lista)
  }

  useEffect(() => {
    console.clear()
    console.debug("Filtro Atualizado!", filter)

    UpdateListing();
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    setInterval(() => {
      UpdateListing()
    }, 3 * 60 * 1000)
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {lista && lista.map((item) => item.pedidos && (
        <>
          <Row>
            <Col size="12">
              <Card>
                <CardHeader className="hi_bg-danger">
                  {item.time}

                  <ActionBox>{item.count.toString().padStart(2, '0')} Pedidos</ActionBox>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            { item.pedidos.map((pedido) => (
              <CardPedido key={pedido.id} pedido={pedido} update={UpdateListing}/>
            ))}
          </Row>
        </>
      ))}
      <ConfigModal filter={filter} setFilter={setFilter} />
    </>
  );
}
