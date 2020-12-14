import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';

export default function ModalAdd({ filter, setFilter }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  async function handleSubmit(data) {
    setFilter([...filter, data]);

    toggle();
  }

  return (
    <>
      <Button onClick={toggle} className="toggle-config">
        <i className="mdi mdi-settings"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-info">
          Filtrar Pedidos
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Row>
              <FormGroup className="col-12">
                <Label>Quantidade Mínima</Label>
                <Input
                  type="text"
                  name="mim_qtd"
                  className="form-control"
                  required
                />
              </FormGroup>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
