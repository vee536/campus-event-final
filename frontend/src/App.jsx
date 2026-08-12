import EventForm
    from "./components/EventForm";

import EventList
    from "./components/EventList";

function App() {

    return (

        <div className="min-h-screen">

            <header className="
                bg-blue-800
                text-white
                py-5
                shadow
            ">

                <div className="
                    max-w-4xl
                    mx-auto
                    px-5
                ">

                    <h1 className="
                        text-2xl
                        font-bold
                    ">
                        Campus Event Management
                    </h1>

                    <p className="
                        text-blue-200
                        text-sm
                        mt-1
                    ">
                    </p>

                </div>

            </header>


            <main className="
                max-w-4xl
                mx-auto
                px-5
                py-8
            ">

                <EventForm />

                <EventList />

            </main>

        </div>

    );
}

export default App;