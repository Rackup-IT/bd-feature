import { Link } from "../../i18n/routing";

interface TagLinkProps {
  href: string;
  text: string;
}

const TagLink: React.FC<TagLinkProps> = (props) => {
  return (
    <Link href={props.href} className="pb-4">
      <p className="text-base px-4 font-mono rounded-md hover:bg-primary-default active:bg-primary-default">
        {props.text}
      </p>
    </Link>
  );
};

export default TagLink;
