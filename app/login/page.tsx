import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';

const Page = () => (
    <div className="min-h-screen bg-white lg:pl-[10%] lg:pr-[10%] lg:pt-9">
        <NavbarComponenet colorText="S" plainText="ignUp" IsParaText={false} />
        <div className="lg:px-[10%] lg:pt-16">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        <span className="text-blue-600">Create</span> an Account
                    </h2>
                    <form className="space-y-6">

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email*
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-lg bg-blue-50 px-4 py-2 text-base border border-transparent focus:border-blue-500"
                                autoComplete="email"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password*
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-lg bg-blue-50 px-4 py-2 text-base border border-transparent focus:border-blue-500"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>
                        <div className="pt-2 w-full flex justify-start">
                            <button
                                type="submit"
                                className="
      rounded-full
      px-8
      py-2
      bg-linear-to-r from-blue-600 to-blue-400
      text-white
      font-semibold
      shadow-md
      focus:outline-none
      transition
      w-[220px] 
      text-center
    "
                            >
                                LOGIN
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

export default Page;
