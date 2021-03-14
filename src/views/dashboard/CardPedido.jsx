import React, { useState } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { ActionBox } from '~/components/Styled';

import api from '~/services/api';

export default function CardPedido({ pedido, update }) {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let hasOBS = false;

  // eslint-disable-next-line
  pedido.items.map(function (item) {
    if (item.observacoes)
      hasOBS = true;
  });

  async function saveItem(data) {
    await api.get(`/pedidos?id_pedido=${pedido.id}&id_status=3`);

    toggle();
    update();
  }

  async function setStatusCoz(id_pedido) {
    await api.get(`/pedidos?id_pedido=${id_pedido}&id_status=2`);

    console.debug(`Status do pedido #${id_pedido} atualizado.`)
  }

  (parseInt(pedido.status) === 1) && setStatusCoz(pedido.id)

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-warning text-black">
          Pedido Nº {pedido.id}
        </ModalHeader>
        <ModalBody className="pt-2">
          Deseja atualizar o status do pedido {pedido.id}?
          <br />
          Esta ação não poderá ser desfeita através deste painel.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Não
          </Button>{' '}
          <Button color="success" onClick={saveItem}>
            Sim.
          </Button>
        </ModalFooter>
      </Modal>

      <Col xs={hasOBS ? '2' : '1'} onClick={toggle}>
        <Card className="mb-4">
          <CardHeader className="hi_bg-warning">
            {pedido.id}
            <ActionBox>
              {parseInt(pedido.delivery) === 1 ? <i className="mdi mdi-motorbike"></i> : ''}
            </ActionBox>
          </CardHeader>
          <CardBody className="p-0">
            {/* <Table>
                <tbody>
                  <tr>
                    <td className="observacoes">{pedido.observacoes}</td>
                  </tr>
                </tbody>
              </Table> */}
            <Table className="mb-0" striped>
              <tbody>
                {pedido.items.map((item) => (
                  <tr key={item.id}>
                    <td className="qtd">
                      {item.qtd}
                      <span
                        style={{
                          color: `${item.flag_color}`,
                          marginLeft: '.2rem',
                        }}
                      >
                        <i className="mdi mdi-message-alert"></i>
                      </span>
                    </td>
                    <td>
                      {item.observacoes ? item.observacoes : '...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
