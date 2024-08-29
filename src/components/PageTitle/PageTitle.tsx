import { motion } from 'framer-motion';
import Container from '../Container/Container';

type Breadcrumb = {
  label: string;
  link: string;
};

type PageTitleProps = {
  title: string;
  breadcrumbs: Breadcrumb[];
};

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs }) => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto text-center md:w-4/12 mt-[50px]">
          <h3 className="text-4xl text-gray-700 py-4">{title}</h3>
          <div className="mt-2">
            {breadcrumbs?.map((breadcrumb, index) => (
              <span key={index}>
                <a href={breadcrumb.link} className="text-blue-500 hover:underline">
                  {breadcrumb.label}
                </a>
                {index < breadcrumbs.length - 1 && ' / '}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default PageTitle;
