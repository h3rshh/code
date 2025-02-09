import DrawingEditor from "@/components/drawing/DrawingEditor";
import Sidebar from "@/components/sidebar/Sidebar";

export default function DrawingPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Drawing Region */}
      <div className="flex-grow">
        <DrawingEditor />
      </div>
    </div>
  );
}
