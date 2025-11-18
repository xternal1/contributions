import React from "react";
import NavigationControlsComponent from "@/components/CourseModule/NavigationControls";
import type { SubModuleDetailType, ContentType as OriginalContentType, ContentBlock } from "@features/module/_module";

interface SubModuleContentProps {
  data: SubModuleDetailType;
  parsedContent?: OriginalContentType | null;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const SubModuleContent: React.FC<SubModuleContentProps> = ({
  data,
  parsedContent,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
  return (
    <main className=" flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">{data.course_title}</h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg text-left font-bold mb-2 text-gray-800 dark:text-white">{data.title}</h1>
          <p className="text-xs text-left text-gray-600 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-gray-600 pb-3 transition-colors duration-500">
            {data.sub_title}
          </p>

          <div className="prose prose-sm max-w-none leading-relaxed text-left space-y-4 text-gray-700 dark:text-gray-300">
            {parsedContent?.blocks?.map((block: ContentBlock) => {
              if (block.type === "paragraph") {
                return <p key={block.id} className="text-sm leading-6" dangerouslySetInnerHTML={{ __html: block.data?.text || "" }} />;
              }
              if (block.type === "list") {
                const ListTag = block.data.style === "ordered" ? "ol" : "ul";
                return (
                  <ListTag key={block.id} className="list-inside space-y-1 ml-4">
                    {block.data.items.map((item, i) => <li key={i} className="text-sm">{item}</li>)}
                  </ListTag>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={block.id} className="my-4 md:my-8">
                    <img
                      src={block.data.file.url}
                      alt={block.data.caption || "content"}
                      className="rounded-xl shadow-md mx-auto w-full max-w-md"
                      loading="lazy"
                    />
                    {block.data.caption && <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 transition-colors duration-500">{block.data.caption}</figcaption>}
                  </figure>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-8 pt-6">
            <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
              <NavigationControlsComponent
                currentNavIndex={currentNavIndex}
                totalNavItems={totalNavItems}
                currentSlug={currentSlug}
                onNext={onNext}
                onPrevious={onPrevious}
                onDiscussion={onDiscussion}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubModuleContent;
