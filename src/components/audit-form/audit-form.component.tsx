import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, parseDate } from '@openmrs/esm-framework';
import { StructuredListWrapper, StructuredListRow, StructuredListCell, StructuredListBody, } from '@carbon/react';
import type { EncounterType } from '../../types';

interface FormGroupData {
  name: string;
  uuid: string;
  version: string;
  encounterType: EncounterType;
  description: string;
  display?: string;
  auditInfo: any;
}

interface AuditFormProps {
  form: FormGroupData;
}

const AuditForm: React.FC<AuditFormProps> = ({ form }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [encounterType, setEncounterType] = useState('');
  const [version, setVersion] = useState('');

  useEffect(() => {
    if (form) {
      setName(form.name);
      setDescription(form.description);
      setEncounterType(`${form.encounterType.display} - ${form.encounterType.uuid}`);
      setVersion(form.version);
    }
  }, [form]);

  return (
    <>
      <StructuredListWrapper>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell>{t('formName')}</StructuredListCell>
            <StructuredListCell>{name}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('description')}</StructuredListCell>
            <StructuredListCell>{description}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('autogeneratedUuid')}</StructuredListCell>
            <StructuredListCell>{form?.uuid}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('version')}</StructuredListCell>
            <StructuredListCell>{version}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('encounterType')}</StructuredListCell>
            <StructuredListCell>{encounterType}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('createdBy')}</StructuredListCell>
            <StructuredListCell>
              {`${form?.auditInfo?.creator?.display} on ${formatDatetime(parseDate(form?.auditInfo?.dateCreated))}`}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>{t('editedBy')}</StructuredListCell>
            <StructuredListCell>
              {form?.auditInfo?.changedBy?.display
                ? `${form?.auditInfo?.changedBy?.display} on ${formatDatetime(parseDate(form?.auditInfo?.dateChanged))}`
                : 'This form has never been editted'}
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </>
  );
};

export default AuditForm;
