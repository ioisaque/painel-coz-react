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
import 'moment/locale/pt-br';
import { DatePickerInput } from 'rc-datepicker';
import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';

import 'rc-datepicker/lib/style.css';

export default function ModalAdd({ filter, setFilter }) {
  const [modal, setModal] = useState(false);
  const [config, setConfig] = useState({
    mqtd: filter.mqtd,
    aday: filter.aday,
    data: filter.data,
  });

  const toggle = () => setModal(!modal);

  function handleSubmit(data) {
    setFilter(config);
    toggle();
  }

  return (
    <>
      <Button
        onClick={() => history.back()}
        className="toggle-painel no-border"
      >
        <i className="mdi mdi-close"></i>
      </Button>
      <Button onClick={toggle} className="toggle-config no-border">
        <i className="mdi mdi-settings"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-info">Filtrar Pedidos</ModalHeader>
        <Form onSubmit={handleSubmit} initialData={config}>
          <ModalBody style={{ padding: '1rem' }}>
            <Row>
              <FormGroup className="col-6 m-0">
                <Label>Qtd Mínima</Label>
                <Input
                  type="text"
                  name="mqtd"
                  defaultValue={config.mqtd}
                  onChange={(mqtd) =>
                    setConfig({
                      mqtd: mqtd,
                      aday: config.aday,
                      data: config.date,
                    })
                  }
                  className="form-control hi_text_center"
                  data-plugin="touchSpin"
                  data-bts-button-down-class="btn btn-outline-zero"
                  data-bts-button-up-class="btn btn-outline-zero"
                />
              </FormGroup>
              <FormGroup className="col-6 m-0">
                <div className="switch">
                  <Label>
                    <Input
                      type="checkbox"
                      name="aday"
                      defaultChecked={config.aday}
                      onChange={(aday) =>
                        setConfig({
                          mqtd: config.mqtd,
                          aday: aday,
                          data: config.date,
                        })
                      }
                    />
                    <span className="lever switch-col-light-blue"></span>Dia
                    Inteiro?
                  </Label>
                </div>

                <DatePickerInput
                  name="data"
                  locale="pt-BR"
                  defaultValue={config.data}
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
