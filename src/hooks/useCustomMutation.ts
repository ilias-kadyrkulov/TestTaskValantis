import {
    useMutation,
    MutationKey,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult
} from '@tanstack/react-query'

export const useCustomMutation = <TData, TError, TVariables, TContext>(
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
    return useMutation<TData, TError, TVariables, TContext>({
        mutationKey,
        mutationFn,
        ...options
    })
}
