import { CheckCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@raystack/apsara';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useFrontier } from '~/react/contexts/FrontierContext';
import { V1Beta1Domain } from '~/src';

export const columns: ColumnDef<V1Beta1Domain, any>[] = [
  {
    accessorKey: 'name',
    meta: {
      style: {
        paddingLeft: 0
      }
    },
    cell: ({ row, getValue }) => {
      return (
        <Flex direction="column">
          <Text>{row.original.name}</Text>
        </Flex>
      );
    }
  },
  {
    accessorKey: 'created_at',
    cell: info => <Text>{info.getValue()}</Text>
  },
  {
    header: '',
    accessorKey: 'id',
    meta: {
      style: {
        textAlign: 'end'
      }
    },
    cell: ({ row, getValue }) => (
      <DomainActions domain={row.original as V1Beta1Domain} />
    )
  }
];

const DomainActions = ({ domain }: { domain: V1Beta1Domain }) => {
  const { client } = useFrontier();
  const navigate = useNavigate();

  async function deleteDomain() {
    if (!domain.id) return;
    if (!domain.org_id) return;

    try {
      await client?.frontierServiceDeleteOrganizationDomain(
        domain.org_id,
        domain.id
      );
      navigate('/domains');
      toast.success('Domain deleted');
    } catch ({ error }: any) {
      toast.error('Something went wrong', {
        description: error.message
      });
    }
  }

  return (
    <Flex align="center" justify="end" gap="large">
      {domain.state === 'pending' ? (
        <Button onClick={() => navigate(`/domains/${domain.id}/verify`)}>
          verify domain
        </Button>
      ) : (
        <Flex
          onClick={deleteDomain}
          gap="extra-small"
          style={{ color: 'var(--foreground-success)' }}
        >
          <CheckCircledIcon style={{ cursor: 'pointer' }} />
          Verified
        </Flex>
      )}

      <TrashIcon
        onClick={deleteDomain}
        color="var(--foreground-danger)"
        style={{ cursor: 'pointer' }}
      />
    </Flex>
  );
};
