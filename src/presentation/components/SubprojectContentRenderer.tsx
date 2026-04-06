import React from "react";
import { SubprojectContent } from "../config/subprojectsContent";

interface SubprojectContentProps {
  content: SubprojectContent | undefined;
}

export const SubprojectContentRenderer: React.FC<SubprojectContentProps> = ({
  content,
}) => {
  if (!content) return null;

  return (
    <>
      {content.social && (
        <p className="font-semibold text-sm">
          <strong>{content.social}</strong>
        </p>
      )}
      <p className="mt-2 leading-relaxed">{content.description}</p>
      {content.details && (
        <p className="mt-2 text-xs font-semibold">
          <strong>{content.details}</strong>
        </p>
      )}
    </>
  );
};
