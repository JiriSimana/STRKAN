import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';

type Spec = { label: string; value: string };

type Props = {
  eyebrow?: string;
  title: string;
  specs: Spec[];
};

export function TechSpecs({ eyebrow, title, specs }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-md text-ink">{title}</h2>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-collapse">
              <tbody>
                {specs.map((spec) => (
                  <tr
                    key={spec.label}
                    className="border-b border-cloud last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="type-eyebrow text-fog py-3 pr-4 text-left align-top"
                    >
                      {spec.label}
                    </th>
                    <td className="type-mono text-ink py-3 pl-4 text-right">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
