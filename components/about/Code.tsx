export default function Code() {
  return (
    <div className="w-full max-w-111.5 overflow-hidden rounded-2xl border border-[#292932] bg-[#0e0e13] text-sm shadow-xl">
      <div className="flex h-11 items-center justify-between border-b border-[#292932] px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>

        <span className="text-xs tracking-wide text-[#9292a3]">
          PHP · backend · Laravel
        </span>
      </div>

      <div className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.8]">
        <pre>
          <code>
            <span className="text-[#777789]">{"<?php"}</span>
            {"\n\n"}
            <span className="text-[#777789]">{"// Route"}</span>
            {"\n"}
            <span className="text-[#c792ea]">Route</span>
            <span className="text-[#e5e7eb]">::</span>
            <span className="text-[#82aaff]">get</span>
            <span className="text-[#e5e7eb]">(</span>
            <span className="text-[#c3e88d]">
              {"\n\t"}
              {"'/api/projects'"}
            </span>
            <span className="text-[#e5e7eb]">, [</span>
            <span className="text-[#c3e88d]">
              {"\n\t"}
              {"'ProjectController"}
            </span>
            <span className="text-[#e5e7eb]">::class, </span>
            <span className="text-[#c3e88d]">
              {"'index'"}
              {"\n"}
              {"'"}
            </span>
            <span className="text-[#e5e7eb]">]);</span>
            {"\n\n"}
            <span className="text-[#777789]">{"// Controller"}</span>
            {"\n"}
            <span className="text-[#c792ea]">public function</span>
            <span className="text-[#82aaff]"> index</span>
            <span className="text-[#e5e7eb]">(Request </span>
            <span className="text-[#f78c6c]">$request</span>
            <span className="text-[#e5e7eb]">): JsonResponse</span>
            {"\n"}
            <span className="text-[#e5e7eb]">{"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-[#c792ea]">return</span>
            <span className="text-[#e5e7eb]"> response()</span>
            {"\n"}
            {"        "}
            <span className="text-[#82aaff]">-&#62;json</span>
            <span className="text-[#e5e7eb]">(</span>
            <span className="text-[#f78c6c]">Project</span>
            <span className="text-[#e5e7eb]">::</span>
            <span className="text-[#82aaff]">query</span>
            <span className="text-[#e5e7eb]">()</span>
            {"\n"}
            {"        "}
            <span className="text-[#82aaff]">-&#62;latest</span>
            <span className="text-[#e5e7eb]">()</span>
            {"\n"}
            {"        "}
            <span className="text-[#82aaff]">-&#62;get</span>
            <span className="text-[#e5e7eb]">());</span>
            {"\n"}
            <span className="text-[#e5e7eb]">{"}"}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}
