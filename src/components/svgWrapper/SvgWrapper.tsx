import { ReactSVG } from 'react-svg';

interface IProps {
  src?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const SvgWrapper = ({
  src, width, height, color,
}: IProps) => {
  const beforeInjection = (svg: SVGSVGElement) => {
    svg.setAttribute('style', `width: ${width}px;height: ${height}px;`);
    if (color) {
      svg.childNodes.forEach((node) => {
        if (node instanceof SVGPathElement) {
          node.setAttribute('fill', color);
        }
      });
    }
  };

  if (!src) return null;

  return (
    <ReactSVG
      src={src}
      wrapper="span"
      beforeInjection={beforeInjection}
    />
  );
};

SvgWrapper.defaultProps = {
  src: '',
  height: 16,
  width: 16,
  color: '#000',
};
